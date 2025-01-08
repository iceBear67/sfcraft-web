import {AppShell, Burger, Group, Text} from "@mantine/core";
import {useDisclosure} from "@mantine/hooks";

type Props = {
    children?: React.ReactNode,
}

export default function Scaffold({children}: Props) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            header={{height: 60}}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
        >
            <AppShell.Header className={"flex flex-col justify-center"}>
                <Group className={"p-5"}>
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <p className={"text-2xl font-logo font-semibold"}>SFCraft</p>
                </Group>
            </AppShell.Header>
            <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
    )
}