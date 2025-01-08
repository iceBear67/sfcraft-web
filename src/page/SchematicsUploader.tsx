import {useSearchParams} from "react-router";
import React, {useState} from "react";
import {Card, Center, Divider, Group, Stack, Text} from "@mantine/core";
import {Dropzone, DropzoneProps} from '@mantine/dropzone';
import {IconUpload} from "../component/icons.tsx";
import {notifications} from "@mantine/notifications";
import * as api from "../api.ts";


function formatToUTC8Intl(date: Date) {
    return new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(date);
}

function Main() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const expireAt = searchParams.get("expireAt") ?? "0";
    const expired = Date.now() > parseInt(expireAt)
    const [uploading, setUploading] = useState<boolean>(false);
    const uploadProps: DropzoneProps = {
        onDrop: async (files) => {
            if (token == null) return
            setUploading(true);
            for (const file of files) {
                try {
                    const beginTime = new Date().getTime()
                    await api.uploadFile(file, token)
                    notifications.show({
                        title: "文件上传成功",
                        message: `${file.name}, 用时 ${(new Date().getTime() - beginTime) / 1000}s`
                    })
                }catch(e){
                    notifications.show({
                        title: "上传失败",
                        message: `无法上传 ${file.name}, 返回: ${e}`,
                        color: 'red'
                    })
                    console.log(e)
                }
            }
            setUploading(false)
        },
        onReject: () => {
            notifications.show({
                title: "文件大小太大",
                message: '单个文件大小不要超过 100 KB.',
                color: 'red',
            })
        },
        loading: uploading,
        maxSize: 100 * 1024
    }
    let component: JSX.Element
    const timeString = formatToUTC8Intl(new Date(parseInt(expireAt)))
    if (token == null) {
        component = <Text size={"xl"}>
            请使用命令重新生成网页。
        </Text>
    } else {
        if (!expired) {
            component = <><Dropzone {...uploadProps}>
                <Group justify={"space-between"} p={10}>
                    <IconUpload />
                    <Stack>
                        <Text size={"xl"} inline>点击或将文件拽到此处。</Text>
                        <Text maw={"32svh"} c={"dimmed"} inline>可上传 .schematic 或 .litematic，单个文件大小不要超过 100 KB.</Text>
                    </Stack>
                </Group>
            </Dropzone>
                <Text c={"dimmed"} className={"text-right"}>
                    {`页面在 ${timeString} 后过期`}
                </Text>
            </>
        } else {
            component = <p className={"text-slate-400 text-xl"}>
                链接已过期，请使用命令重新生成网页。
            </p>
        }
    }

    return <Stack>
        <p className={"text-2xl text-blue-500"}>上传原理图</p>
        <Divider/>
        {component}
    </Stack>
}

function SchematicsUploader() {
    return (
        <>
            <Center className={"h-full w-full"}>
                <Card shadow={"sm"} padding={"lg"} radius={"md"}>
                    <Main/>
                </Card>
            </Center>
        </>
    )
}

export default SchematicsUploader
