import adminInstance from "../Axios/AdminAuth";


export const fetchReportedPosts = () =>adminInstance.get('reportedPosts')
export const blockUserPost =(postId)=>adminInstance.post('blockPost',({postId:postId}))
export const UnblockUserPost =(postId) =>adminInstance.post('unblockPost',({postId}))