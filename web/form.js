import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  content.classList.add("placeholder")

  const urlVideo = input.value
  if (!urlVideo.includes("shorts")) {
    //alert("Este video não é um shorts")
    return (content.innerHTML = "Este video não é um shorts")
  }

  const [_, params] = urlVideo.split("/shorts/")
  const [videoID] = params.split("?si")

  content.innerHTML = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID)

  content.textContent = "Realizando o resumo...."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
