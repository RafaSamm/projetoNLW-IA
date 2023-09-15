import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => {
  const videoURL = "https://www.youtube.com/shorts/" + videoId
  console.log("Realizando o download do video: " + videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      if (seconds > 60) {
        throw new Error("A duração deste video é maior do que 60s!")
      }
    })
    .on("end", () => {
      console.log("Download finalizado!")
    })
    .on("error", (error) => {
      console.log(
        "Não foi possivel fazer o download do video. Detalhe do erro: " + error
      )
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
}
