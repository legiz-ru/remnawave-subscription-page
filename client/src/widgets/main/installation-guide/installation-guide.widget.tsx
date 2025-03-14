import {
    IconBrandAndroid,
    IconBrandApple,
    IconCheck,
    IconCloudDownload,
    IconDeviceDesktop,
    IconDownload,
    IconExternalLink
} from '@tabler/icons-react'
import { Button, Group, Tabs, Text, ThemeIcon, Timeline } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { useSubscriptionInfoStoreInfo } from '@entities/subscription-info-store'

export const InstallationGuideWidget = () => {
    const { t } = useTranslation()
    const { remnawaveSubscription } = useSubscriptionInfoStoreInfo()

    const [defaultTab, setDefaultTab] = useState(() => {
        try {
            if (typeof window !== 'undefined' && window.navigator) {
                const userAgent = window.navigator.userAgent.toLowerCase()
                if (userAgent.indexOf('android') !== -1) {
                    return 'android'
                } else if (
                    userAgent.indexOf('iphone') !== -1 || 
                    userAgent.indexOf('ipad') !== -1
                ) {
                    return 'ios'
                }
            }
            return 'desktop'
        } catch (error) {
            return 'desktop'
        }
    })

    if (!remnawaveSubscription) return null

    const { subscriptionUrl } = remnawaveSubscription

    const openclash = () => {
        window.open(`clash://install-config?url=${subscriptionUrl}`, '_blank')
    };

    const opensingbox = () => {
        window.open(`sing-box://import-remote-profile?url=${subscriptionUrl}`, '_blank');
    };
    
    return (
        <Tabs defaultValue={defaultTab}>
            <Group mb="md">
                <Text fw={700} size="xl">
                    {t('installation-guide.widget.instrukciya')}
                </Text>
                <Tabs.List>
                    <Tabs.Tab leftSection={<IconBrandAndroid />} value="android">
                        Android
                    </Tabs.Tab>
                    <Tabs.Tab leftSection={<IconBrandApple />} value="ios">
                        iOS
                    </Tabs.Tab>
                    <Tabs.Tab leftSection={<IconDeviceDesktop />} value="desktop">
                        {t('installation-guide.widget.pk')}
                    </Tabs.Tab>
                </Tabs.List>
            </Group>

            <Tabs.Panel value="android">
                <Timeline active={1} bulletSize={32} color="teal" lineWidth={2}>
                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.install-clashmeta')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.open-github')}
                        </Text>
                        <Button
                            component="a"
                            href="https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.7/cmfa-2.11.7-meta-universal-release.apk"
                            leftSection={<IconExternalLink size={16} />}
                            target="_blank"
                            variant="light"
                        >
                            {t('installation-guide.widget.download-github')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCloudDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.add-subscription')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.add-subscription-description-clashmeta')}
                        </Text>
                        <Button onClick={openclash} variant="filled">
                            {t('installation-guide.widget.add-subscription-button')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCheck size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.connect-and-use')}
                    >
                        <Text c="dimmed" size="sm">
                            {t('installation-guide.widget.connect-and-use-description-clashmeta')}
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </Tabs.Panel>

            <Tabs.Panel value="ios">
                <Timeline active={1} bulletSize={32} color="teal" lineWidth={2}>
                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.install-singbox')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.install-app-store-description')}
                        </Text>
                        <Button
                            component="a"
                            href="https://apps.apple.com/app/sing-box-vt/id6673731168"
                            leftSection={<IconExternalLink size={16} />}
                            target="_blank"
                            variant="light"
                        >
                            {t('installation-guide.widget.open-app-store')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCloudDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.add-subscription')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.add-ios-subscription-description')}
                        </Text>
                        <Button onClick={opensingbox} variant="filled">
                            {t('installation-guide.widget.add-subscription-button')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCheck size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.connect-and-use')}
                    >
                        <Text c="dimmed" size="sm">
                            {t('installation-guide.widget.connect-and-use-description-singbox')}
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </Tabs.Panel>

            <Tabs.Panel value="desktop">
                <Timeline active={1} bulletSize={32} color="teal" lineWidth={2}>
                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.install-flclash')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.install-flclash-description')}
                        </Text>
                        <Group>
                            <Button
                                component="a"
                                href="https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-windows-amd64-setup.exe"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                Windows
                            </Button>
                            <Button
                                component="a"
                                href="https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-macos-arm64.dmg"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                macOS Apple Silicon
                            </Button>
                            <Button
                                component="a"
                                href="https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-macos-amd64.dmg"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                macOS Intel x64
                            </Button>
                            <Button
                                component="a"
                                href="https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-linux-amd64.AppImage"
                                leftSection={<IconExternalLink size={16} />}
                                target="_blank"
                                variant="light"
                            >
                                Linux
                            </Button>
                        </Group>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCloudDownload size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.add-subscription')}
                    >
                        <Text c="dimmed" mb={16} size="sm">
                            {t('installation-guide.widget.add-subscription-pc-description')}
                        </Text>
                        <Button onClick={openclash} variant="filled">
                            {t('installation-guide.widget.add-subscription-button')}
                        </Button>
                    </Timeline.Item>

                    <Timeline.Item
                        bullet={
                            <ThemeIcon color="teal.5" radius="xl" size={26}>
                                <IconCheck size={16} />
                            </ThemeIcon>
                        }
                        title={t('installation-guide.widget.connect-and-use')}
                    >
                        <Text c="dimmed" size="sm">
                            {t('installation-guide.widget.select-server-flclash')}
                        </Text>
                    </Timeline.Item>
                </Timeline>
            </Tabs.Panel>
        </Tabs>
    )
}
