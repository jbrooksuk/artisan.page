import cors from 'cors'

export default defineNitroPlugin(({ h3App }) => {
  h3App.use(cors)
})
