import Scaffold from "../component/Scaffold"
import {Avatar, Card, Grid, Group, Stack, Text} from "@mantine/core";
import {useSearchParams} from "react-router";
import {GameProfile} from "../api.ts";
import * as api from "../api";
import ErrorCard from "../component/Error.tsx";
import React, {useEffect, useState} from "react";

interface PlayerInfoCardProps {
    player: GameProfile
}

function PlayerInfoCard({player}: PlayerInfoCardProps) {
    return <Card shadow={"sm"} p={5}>
        <Group>
            <Avatar src={`https://mc-heads.net/avatar/${player.id}`} radius={"sm"} size={"xl"}/>
            <Stack>
                <Text></Text>
            </Stack>
        </Group>
    </Card>
}

export default function PlayerProfile() {
    const [searchParam] = useSearchParams();
    const uuid = searchParam.get("uuid");
    const [profile, setProfile] = useState<GameProfile | undefined>(undefined)
    useEffect(() => {
        if (uuid != null) {
            api.fetchProfileById(uuid)
                .then(response => setProfile(response))
        }
        return () => {
        }
    }, []);
    if (uuid == null) {
        return <ErrorCard errorInfo={undefined} />
    }
    return (<>
        <Grid>
            <Grid.Col span={4}>
                <PlayerInfoCard player={profile}/>
            </Grid.Col>
        </Grid>
    </>)
}