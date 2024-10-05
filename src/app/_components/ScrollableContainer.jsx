"use client"

import { useRef, useEffect } from "react";

export const ScrollContainer = ({ children }) => {
    const outerDiv = useRef(null);
    const innerDiv = useRef(null);
  
    const prevInnerDivHeight = useRef(null);
  
    useEffect(() => {
        const outerDivHeight = outerDiv.current.clientHeight;
        const innerDivHeight = innerDiv.current.clientHeight;
        const outerDivScrollTop = outerDiv.current.scrollTop;
    
        // scroll to bottom if the user was already at the bottom or first render
        if (
          !prevInnerDivHeight.current ||
          outerDivScrollTop >= prevInnerDivHeight.current - outerDivHeight - 10
        ) {
          outerDiv.current.scrollTo({
            top: innerDivHeight - outerDivHeight,
            left: 0,
            behavior: prevInnerDivHeight.current ? "smooth" : "auto"
          });
        }
    
        prevInnerDivHeight.current = innerDivHeight;
      }, [children]);
  
      return (
        <div className="relative w-full h-full">
          <div
            ref={outerDiv}
            className="relative w-full h-full overflow-scroll scrollbar-hide"
          >
            <div ref={innerDiv} className="flex flex-col w-full relative gap-12">
              {children}
            </div>
          </div>
        </div>
      );
  };