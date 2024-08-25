const videoElement = document.getElementById("video");
const button = document.getElementById("button");

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    //   getDisplayMedia() の挙動: getDisplayMedia() を呼び出すと、
    //   通常、ユーザーは共有する画面またはウィンドウを選択します。
    //   この選択後、フォーカスが共有する画面に移ってしまうのは
    //   ブラウザのデフォルトの挙動です。
    //   これはセキュリティとユーザー体験を向上させるために設計されています。
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.error("whoops,error here:", error);
  }
}

button.addEventListener("click", async () => {
  // disable button
  button.disabled = true;
  // Ensure the video is playing before requesting Picture in Picture
  await videoElement.play();
  // Start Picture in Picture
  await videoElement.requestPictureInPicture();
  // Reset Button
  button.disabled = false;
});
// on load
selectMediaStream();
