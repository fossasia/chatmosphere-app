import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { panOptions } from "../PanWrapper/panOptions"

/* fixed size won't work, because when scale is 1 there will be room to pan; but the plugin won't allow it because scale is 1. 
the fix is to set the size of the react-transform-component and react-transform-element exlusively (see App.css) */

const RoomContainer = styled.div<{ bg: string }>`
  width: ${panOptions.room.size.x}px;
  height: ${panOptions.room.size.y}px;
  box-sizing: border-box;
  display: block;
  background: ${(props) => (props.bg ? "url(props.bg)" : "brown")};
`

// const Background = styled.div`
//   background-image:url("/build/favicon.ico");
//   opacity:0.1;
//   width:100%;
//   height:100%;
// `

export const Room: React.FC = ({ children }) => {
  const [background, setBackground] = useState("")
  useEffect(() => {
    const getBg = async () => {
      try {
        const data = await fetch(
          `https://api.eventyay.com/v1/events/350bf76b/video-stream`,
          {
            headers: {
              Accept: "application/vnd.api+json",
            },
          },
        ).then((res) => res.json())
        console.log(data)
        const bg = data["data"]["attributes"]["bg-img-url"]
        console.log(bg)
        setBackground(bg)
      } catch (err) {
        console.error("Not able to fetch background", err)
      }
    }
    getBg()
  }, [])

  return (
    <RoomContainer bg={background}>
      {/* <Background /> */}
      {children}
    </RoomContainer>
  )
}
