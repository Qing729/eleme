export function handleStar(score){
    let starHtml = '';
    const solid_num = Math.floor(Number(score));
    const num = Number(score)*10%10;
    for(let i=0;i<solid_num;i++){
        starHtml += '<img class="star" src="../../../static/images/star_01.jpg" />';
    }
    if(5-solid_num>0){
        if(num==5){
            starHtml += '<img class="star" src="../../../static/images/star_02.jpg" />';
        }else if(num>0&&num<5){
            starHtml += '<img class="star" src="../../../static/images/star_02.jpg" />'; 
        }else if(num>5){
            starHtml += '<img class="star" src="../../../static/images/star_02.jpg" />';
        }else{
            starHtml += '<img class="star" src="../../../static/images/star_03.jpg" />';
        }
        for(let j=0;j<4-solid_num;j++){
            starHtml += '<img class="star" src="../../../static/images/star_03.jpg" />';
        }
    }
    return starHtml;
}