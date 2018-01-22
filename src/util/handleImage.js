import Api from '../api'
export function handleImage(path, size){
    if(path){
        let hz = path.endsWith('png')?'.png':'.jpeg';

        return Api.IMAGE_HOST
            + path + hz
            + `?imageMogr/format/webp/thumbnail/!${size}x${size}r/gravity/Center/crop/${size}x${size}/`
    }else{
        return '';
    }
}