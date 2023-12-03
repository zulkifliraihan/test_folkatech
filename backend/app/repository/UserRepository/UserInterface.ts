interface UserInterface {
    getData(): Promise <object[]>
    createData(data: any): Promise <object>
    detailData(id: number): Promise <any>
    updateData(id: number, data: any): Promise <any>
    deleteData(id: number): Promise <any>
    checkEmailData(email: string): Promise <any>
    latestData(): Promise <any>
    updateOrCreateData(id: number, dataCreate: any, dataUpdate: any): Promise <any>
}

export default UserInterface
