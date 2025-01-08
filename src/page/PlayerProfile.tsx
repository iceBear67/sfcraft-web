import {Avatar, Card, Grid, Group, Stack, Text, Title} from "@mantine/core";
import {useParams} from "react-router";
import {GameProfile} from "../api.ts";
import * as api from "../api";
import ErrorCard from "../component/Error.tsx";
import React, {useEffect, useState} from "react";

interface PlayerInfoCardProps {
    player: GameProfile
}

function PlayerInfoCard(props: PlayerInfoCardProps) {
    const player = props.player
    return <Card shadow={"sm"} p={"lg"}>
        <Group>
            <Avatar src={`https://mc-heads.net/avatar/${player.id}`} radius={"sm"} size={"xl"}/>
            <Stack className={"self-start"} gap={"0"}>
                <Text size={"xl"} mt={"sm"}>{player.name}</Text>
                <Text size={"md"} c={"dimmed"}>Joined at 191 days ago.</Text>
            </Stack>
        </Group>
    </Card>
}

export default function PlayerProfile() {
    const pathParam = useParams();
    const uuid = pathParam.uuid;
    const [profile, setProfile] = useState<GameProfile | undefined>(undefined)
    useEffect(() => {
        if (uuid != null) {
            api.fetchProfileById(uuid)
                .then(response => setProfile(response))
        }
        return () => {
        }
    }, [uuid]);
    if (!uuid || !profile) {
        return <ErrorCard errorInfo={{
            title: "账户不存在",
            description: `服务器上没有找到 UUID 为 ${uuid?.substring(0, Math.min(uuid?.length, 6))}... 的玩家。`
        }}/>
    }
    return (<>
        <Stack className={"w-full"}>
            <Title mt={"lg"} mb={"lg"} ml={0}>玩家信息</Title>
            <Grid>
                <Grid.Col span={3}>
                    <PlayerInfoCard player={profile}/>
                </Grid.Col>

            </Grid>
        </Stack>
    </>)
}