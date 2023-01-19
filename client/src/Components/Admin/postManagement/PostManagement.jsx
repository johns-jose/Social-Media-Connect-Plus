import React, { useEffect, useState } from "react";
import moment from "moment"
import { ToastContainer, toast } from 'react-toastify';  //Toast
import 'react-toastify/dist/ReactToastify.css';  //Toast Css
import { fetchReportedPosts,blockUserPost,UnblockUserPost } from '../../../api/Postrequest'

function PostManagement() {
    const [posts, setPosts] = useState([])
    const [userBlock, setUserBlock] = useState()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await fetchReportedPosts()
                setPosts(data)
            } catch (error) {

            }
        }
        fetchPosts()

    }, [userBlock])

    const handleBlockPost = async(postId)=>{
        console.log('post Id',postId);
        try {
            const {data}=  await blockUserPost(postId)
            console.log('data',data);
            setUserBlock(Date.now())
            toast.warn(data.message)
        } catch (error) {
            
        }
    }
    const handleUnBlockPost = async(postId)=>{
        try {
            const {data}= await UnblockUserPost(postId)
            console.log('undata',data);
            setUserBlock(Date.now())
            toast.warn(data.message)
        } catch (error) {
            
        }
        UnblockUserPost()

    }





    return (
        <>
            <div className='w-full mr-6 max-h-screen overflow-y-auto no-scrollbar'>
                <h2 className='text-2xl font-bold my-6'>Post Management</h2>

                <div className='overflow-x-auto relative'>
                    <table className='w-full text-sm  text-gray-500 dark:text-gray-400 text-center'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope='col' className='py-3 px-6'>
                                    Post Id
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Posted By
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Created Date
                                </th>
                                {/* <th scope='col' className='py-3 px-6'>
                                    Status
                                </th> */}
                                <th scope='col' className='py-3 px-6'>
                                    No.of Reports
                                </th>
                                <th scope='col' className='py-3 px-6'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => {
                                let date = moment(post?.createdAt).format("YYYY-MM-DD")
                                return (

                                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                        <th
                                            scope='row'
                                            className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                        >
                                            {post?._id}
                                        </th>
                                        <td className='py-4 px-6'>{post?.userId}</td>
                                        <td className='py-4 px-6'>{date}</td>
                                        {/* <td className='py-4 px-6'>{post?.status}</td> */}
                                        <td className='py-4 px-6'>{post?.report?.length}</td>
                                        <td className='py-4 px-6'>

                                           {!post.status ? <button
                                                type='button'
                                                   onClick={() =>handleBlockPost(post._id)}
                                                className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'>
                                                block
                                            </button>:
                                            <button
                                                type='button'
                                                  onClick={() =>handleUnBlockPost(post._id)}
                                                className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'>
                                                Unblock
                                            </button>}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer
                position='top-center'
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme='dark'
            />

        </>

    )
}

export default PostManagement