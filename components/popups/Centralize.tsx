import { GetHeight, GetWidth } from "./GetDimention";

export function Centralize(height: number, top: number, width: number, left: number) {
    const { viewHeight } = GetHeight();
    const { viewWidth } = GetWidth();
    const topHeight = (viewHeight > (height + 2*top)) ? (viewHeight - height)/2 : top;
    const offsetElementHeight = height + 2*topHeight;
    const leftWidth = (viewWidth > (width + 2*left)) ? (viewWidth - width)/2 : left;
    const offsetElementWidth = width + 2*leftWidth;
    //centralizing an element
    const bgStyle: React.CSSProperties = {   
        position: "fixed",
        top: '0px',
        left:"0px",
        height: `${viewHeight}px`,
        width: `${viewWidth}px`,
        overflow: "auto",
        zIndex: "7",
    };
    const elementPosition: React.CSSProperties = {
        position:"absolute",
        top:`${topHeight}px`,
        left: `${leftWidth}px`
    };
    const offsetElementPosition: React.CSSProperties = {
        height:`${offsetElementHeight}px`, 
        width: `${offsetElementWidth}px`   
    };
    return {
        bgStyle: bgStyle,
        elementPosition: elementPosition,    
        offsetElementPosition: offsetElementPosition,
    };   
}