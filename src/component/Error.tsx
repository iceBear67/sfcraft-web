import {Button, Card, Center, Stack, Text} from "@mantine/core";

export type ErrorInfo = {
    title: string | undefined,
    description: string | undefined,
    navigateBack: (() => undefined) | undefined,
}

interface ErrorCardProps {
    errorInfo: ErrorInfo | undefined
}

export default function ErrorCard(props: ErrorCardProps | undefined) {
    const errorInfo = props?.errorInfo ?? {} as ErrorInfo
    return <Center>
        <Card shadow={"sm"} p={5} c={"red"}>
            <Stack gap={"md"}>
                <Text size={"xl"} c={"red"}>{errorInfo.title ?? "Oh no!"}</Text>
                <Text size={"md"}>{errorInfo.description ?? "看起来此页面遇到了一些问题，请尝试联系管理员。"}</Text>
                {
                    errorInfo.navigateBack ?
                        <Button onClick={errorInfo.navigateBack()}>返回</Button>
                        : null
                }
            </Stack>
        </Card>
    </Center>

}