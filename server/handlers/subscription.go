package handlers

import (
	"compress/gzip"
	"github.com/gofiber/fiber/v2"
	"io"
	"log/slog"
	"strings"
	"subscription-page-template/server/api"
	"subscription-page-template/server/utils"
)

type SubscriptionHandler struct {
	apiClient *api.Client
}

func NewSubscriptionHandler(apiClient *api.Client) *SubscriptionHandler {
	return &SubscriptionHandler{
		apiClient: apiClient,
	}
}

func (h *SubscriptionHandler) HandleSubscription(c *fiber.Ctx) error {
	shortId := c.Params("shortId")
	if shortId == "" {
		return c.Status(fiber.StatusBadRequest).SendString("Bad request.")
	}

	headers := make(map[string][]string)
	c.Request().Header.VisitAll(func(key, value []byte) {
		headers[string(key)] = append(headers[string(key)], string(value))
	})

	resp, err := h.apiClient.FetchAPI(shortId, headers)
	if err != nil {
		slog.Error("Error fetching API", "error", err)
		return c.Status(fiber.StatusInternalServerError).SendString("Request error.")
	}
	defer resp.Body.Close()

	var reader io.ReadCloser
	switch resp.Header.Get("Content-Encoding") {
	case "gzip":
		reader, err = gzip.NewReader(resp.Body)
		if err != nil {
			panic(err)
		}
		defer reader.Close()
	default:
		reader = resp.Body
	}

	body, err := io.ReadAll(reader)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Read response error.")
	}

	userAgent := c.Get("User-Agent")

	if utils.IsBrowser(userAgent) {
		return c.Render("./dist/index.html", fiber.Map{
			"Data": string(body),
		})
	}

	for name, values := range resp.Header {
		for _, value := range values {
			c.Set(name, value)
		}
	}

	filteredHeaders := []string{
		"Profile-Title",
		"Profile-Update-Interval",
		"Subscription-Userinfo",
		"Profile-Web-Page-Url",
		"Content-Disposition",
	}

	for _, header := range filteredHeaders {
		if values, found := resp.Header[header]; found {
			c.Set(header, strings.Join(values, ","))
		}
	}

	c.Set("Content-Encoding", "application/gzip")
	return c.Status(resp.StatusCode).Send(body)
}
