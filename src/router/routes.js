


export default [{
    path: '/',
    redirect: '/home',
},
{
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
},
{
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/blog/index'),
},
{
    path: '/login',
    name: 'login',
    component: () => import('@/views/member/login'),
}
];
