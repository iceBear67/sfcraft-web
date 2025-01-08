import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import SchematicsUploader from './page/SchematicsUploader.tsx'
import PlayerProfile from "./page/PlayerProfile.tsx";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Scaffold from "./component/Scaffold.tsx";


createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <Notifications />
        <Scaffold>
            <BrowserRouter>
                <Routes>
                    <Route path={"/schematics/upload"} element={<SchematicsUploader/>}/>
                    <Route path={"/profile/:uuid"} element={<PlayerProfile/>}/>
                </Routes>
            </BrowserRouter>
        </Scaffold>
    </MantineProvider>
)
