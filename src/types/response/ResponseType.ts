interface ResponseType<T> {
    success: boolean
    errors: string[]
    data: T // 'T' represents the type of data
    message: string
    actions: string[]
  }
  export default ResponseType;
  
  