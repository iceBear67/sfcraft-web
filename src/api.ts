import {FileWithPath} from "@mantine/dropzone";

export type GameProfile = {
    name: string,
    id: string
}

export async function uploadFile(file: FileWithPath, uploadSign: string){
    const formData = new FormData();
    formData.append("file", file)
    return fetch(`${API_ENDPOINT}/api/schematics/${file.name}?sign=${uploadSign}`, {
        method: 'PUT',
        body: formData
    })
}

export async function fetchProfileById(id: string): Promise<GameProfile>{
    // return fetch(`${API_ENDPOINT}/api/player/${id}`)
    return {
        name: "SomeName_",
        id: id
    }
}