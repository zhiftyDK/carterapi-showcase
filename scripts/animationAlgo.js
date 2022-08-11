function animation_sheet_arranged(result)
{
    //1 -idle frames
    //2- start speak frames
    //3- end speak frames //last frame (15) used for space b, m, p
    //4- AEILUTH frames
    //5- CDGKNSTXYZFV frames
    //6- CHSHJR frames
    //7- O frames
    //8- QW frames

    let frames = [];
    console.log(result.length);
    for(let i=0;i<result.length;i++)
    {
        
        
        if((result[i]==="c"&& result[i+1]==="h")||(result[i]==="s"&&result[i+1]==="h")||(result[i]==="j")||(result[i]==="r"))
        {
            frames[i]=6;

        }
        else if((result[i]==="a"||result[i]==="e"||result[i]==="i"||result[i]==="l"||result[i]==="u")||(result[i]==="t"&&result[i+1]==="h"))
        {
            frames[i]=4;
            if(result[i]==="t"&&result[i+1]==="h"){
                frames[i+1]=4;
                i++;

            }
            
        }
        else if(result[i]==="c"||result[i]==="d"||result[i]==="g"||result[i]==="k"||result[i]==="n"||result[i]==="s"||
        result[i]==="t"||result[i]==="x"||result[i]==="y"||result[i]==="z"||result[i]==="f"||result[i]==="v")
        {
            frames[i]=5;
        }
        else if(result[i]==="o")
        {
            frames[i]=7;
        }
        else if(result[i]==="q"||result[i]==="w")
        {
            frames[i]=8;
        }
        else//includes spaces , b , m and p
        {
            frames[i]=3;

        }
        
    }
    console.log(frames);
    return frames;
}