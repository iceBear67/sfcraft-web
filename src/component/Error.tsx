import {Button, Center, Stack, Text, Title} from "@mantine/core";

export interface ErrorCardProps {
    errorInfo?: {
        title?: string,
        description?: string,
        navigateBack?: () => undefined,
    }
}

export default function ErrorCard(
    {
        errorInfo: {
            title = "Oh no...",
            description = "加载此页面时遇到了一些问题，请尝试联系管理员。",
            navigateBack = undefined
        } = {}
    }: ErrorCardProps) {
    return <Center>
        <Stack gap={"md"}>
            <Title c={"red"} className={"text-center"} order={3}>{title}</Title>
            <Text size={"md"}
                  c={"dark"}>{description}</Text>
            {
                navigateBack ?
                    <Button onClick={navigateBack()}>返回</Button>
                    : null
            }
        </Stack>
    </Center>

}