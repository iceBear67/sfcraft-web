import {Button, Center, Stack, Text, Title} from "@mantine/core";

export type ErrorInfo = {
    title: string | undefined,
    description: string | undefined,
    navigateBack: (() => undefined) | undefined,
}

interface ErrorCardProps {
    errorInfo: ErrorInfo
}

export default function ErrorCard({errorInfo = {} as ErrorInfo}: ErrorCardProps) {
    return <Center>
        <Stack gap={"md"}>
            <Title c={"red"} className={"text-center"} order={3}>{errorInfo.title ?? "Oh no...."}</Title>
            <Text size={"md"}
                  c={"dark"}>{errorInfo.description ?? "加载此页面时遇到了一些问题，请尝试联系管理员。"}</Text>
            {
                errorInfo.navigateBack ?
                    <Button onClick={errorInfo.navigateBack()}>返回</Button>
                    : null
            }
        </Stack>
    </Center>

}