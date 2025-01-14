
export const imageNameShorter = (imageFile) =>
{
    if (!imageFile || imageFile.length === 0 || !imageFile[0].name || !imageFile[0].type) {
        throw new Error("Invalid image file input.");
    }

    if (imageFile[0].name.length <= 15) {
        return imageFile[0].name;
    }

    const fileName = imageFile[0].name.substring(0, 10);
    const fileType = imageFile[0].type.split('/')[1];
    const shortenedName = `${fileName}....${fileType}`;
    
    return shortenedName;
}