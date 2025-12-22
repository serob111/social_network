import bcrypt from 'bcrypt';

export const doHash = async (value: string) => {
    const hashed = await bcrypt.hash(value, 10);
    return hashed
}

export const compareHash=async(value:string,comparing:string)=>{
    return await bcrypt.compare(value, comparing)
}