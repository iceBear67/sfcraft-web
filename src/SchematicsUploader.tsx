import {Divider, Flex, UploadProps} from "antd";
import Dragger from "antd/es/upload/Dragger";
import {InboxOutlined} from "@ant-design/icons";
import {useSearchParams} from "react-router";

function Main() {
    const uploadProps: UploadProps = {
        multiple: true,
        method: "PUT",
        directory: false,
        action: file => `http://localhost:8080/api/schematics/${file.name}`,
    }
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const expireAt = searchParams.get("expireAt") ?? "0";
    const expired = Date.now() > parseInt(expireAt)
    let component: JSX.Element
    if(token == null){
        component = <p className={"text-slate-200 text-xl"}>
            Please claim a new URL from server command.
        </p>
    }else{
        if(expired) {
            component = <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="text-slate-200 text-xl">Click or drag</p>
                <p className="text-slate-400 text-xs">
                    You are only allowed to upload files in these format: .schem
                    .schematic .litematic
                </p>
            </Dragger>
        }else{
            component = <p className={"text-slate-200 text-xl"}>
                This page has been expired. Please log into game for a new link.
            </p>
        }
    }

    return <>
        <p className={"text-slate-200 text-2xl"}>Upload your Schematics</p>
        <p className={"text-slate-400"}>{
            expired ? "This page is expired." : `This page expires at ${new Date(expireAt).toLocaleTimeString()}`
        }</p>
        <Divider/>
        {component}
    </>
}

function SchematicsUploader() {
    return (
        <>
            <div className={"w-full h-dvh bg-slate-800"}>
                <Flex vertical={false} align={"center"} justify={"center"} className={"w-full h-full"}>
                    <div className={"w-1/3 h-1/2 bg-slate-700 shadow-2xl"}>
                        <Flex vertical={true} justify={"center"} align={"center"} className={"m-10"}>
                            <Main />
                        </Flex>
                    </div>
                </Flex>
            </div>
        </>
    )
}

export default SchematicsUploader
