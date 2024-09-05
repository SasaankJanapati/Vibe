import React, { useEffect } from "react";

type Props = {};

const ChatBot = (props: Props) => {
  let script1, script2;
  useEffect(() => {
    // Inject the Botpress Webchat script
    const script1 = document.createElement("script");
    script1.src = "https://cdn.botpress.cloud/webchat/v2.1/inject.js";
    script1.async = true;
    document.body.appendChild(script1);

    // Inject the Botpress Webchat configuration script
    const script2 = document.createElement("script");
    script2.src =
      "https://mediafiles.botpress.cloud/30422fcc-ea66-4094-a5b7-16c029abb3f2/webchat/v2.1/config.js";
    script2.async = true;
    document.body.appendChild(script2);

    // Clean up the scripts on component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // No need to render anything in the JSX as scripts handle the UI
};

export default ChatBot;
