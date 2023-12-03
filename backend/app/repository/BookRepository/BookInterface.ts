interface BookInterface {
    getData(): Promise <object[]>
    createData(data: any): Promise <object>
    detailData(id: number): Promise <any>
    updateData(id: number, data: any): Promise <any>
    deleteData(id: number): Promise <any>
}

export default BookInterface
