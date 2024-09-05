"use client";

import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface IParams {
  roomId: string;
}

const RoomId = ({ params }: { params: IParams }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  function randomID(len: number) {
    let result = "";
    if (result) return result;
    let chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  useEffect(() => {
    const handleMeeting = async () => {
      const appID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID!);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_SECRET;

      if (!appID || !serverSecret) {
        console.error("Invalid Zego app ID or server secret.");
        return;
      }

      // Generate the token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        params.roomId,
        randomID(5),
        randomID(5)
      );

      // Create instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      if (containerRef.current) {
        zp.joinRoom({
          container: containerRef?.current,
          // sharedLinks: [
          //   {
          //     name: "Personal link",
          //     url: `${window.location.protocol}//${window.location.host}/call?roomID=${params.roomId}`,
          //   },
          // ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // Use ZegoUIKitPrebuilt.OneONoneCall for 1-on-1 calls.
          },
          showPreJoinView: false,
          onLeaveRoom: () => {
            // router.replace(`/conversations/${params.roomId}`)
            window.close();
          },
        });
      }
    };

    handleMeeting();
  }, [params.roomId]);

  return (
    <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>
  );
};

export default RoomId;
