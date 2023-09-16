import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do video: " + videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        if (seconds > 80) {
          throw new Error("A duração deste video é maior do que 80s!")
        }
      })
      .on("end", () => {
        console.log("Download finalizado!")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi possivel fazer o download do video. Detalhe do erro: " +
            error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
