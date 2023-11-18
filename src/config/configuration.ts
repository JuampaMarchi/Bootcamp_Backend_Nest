export default () => ({
    dev: process.env.NOD_ENV,
    port: process.env.PORT || 3000,
    mongo_atlas: process.env.MONGO_ATLAS_URI
})