interface Text {
    content: string
}

interface TRow{
    formatText?: Text
}


export const SearchIn = ( text : string, array : TRow[][] ) => {
    if(text.length > 0){
        const output : TRow[][] = [];
        array.forEach(elements => {
            elements.forEach(element => {
                if(element.formatText){
                    const content = element.formatText.content;
                    content.toLowerCase();
                    const t = text.toLowerCase();
    
                    const found = content.search(t);
                    if(found >= 0){
                        const isPushed = output.find(e => e === elements);
                        if(!isPushed)
                        output.push(elements)
                    }
                }
            });
        });
        return output
    }
}