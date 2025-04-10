'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { checkForAppUpdates } from '@/lib/updater';

import { invoke } from '@tauri-apps/api/core';
import { message } from '@tauri-apps/plugin-dialog';
import { useTauriAppVersion, useTauriOsType } from '@/hooks/useTauriApp';

export default function Home() {
  const appVersion = useTauriAppVersion();
  const osType = useTauriOsType();

  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  // 新增状态追踪 scoop 更新过程
  const [isUpdatingScoop, setIsUpdatingScoop] = useState(false);

  // 使用 useEffect 在组件挂载时检查更新和获取操作系统类型
  useEffect(() => {
    checkForAppUpdates(false);
  }, []);

  // 将 scoopUpdate 移动到组件内部
  const scoopUpdate = () => {
    if (osType !== 'windows') {
      message('仅支持 Windows 系统的 Scoop 更新');
      return;
    }
    setIsUpdatingScoop(true);
    invoke('scoop_update')
      .then(() => {
        message('Scoop 更新完成');
      })
      .catch((error) => {
        console.error(error);
        message('更新失败，请检查 Scoop 是否安装');
      })
      .finally(() => {
        setIsUpdatingScoop(false);
      });
  };

  return (
    <div className='flex h-screen flex-col bg-slate-50'>
      {/* 顶部导航栏 */}
      <header
        className='flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3'
        data-tauri-drag-region
      >
        <div className='flex items-center gap-3'>
          <Image
            src='/app-icon.svg'
            alt='Onlywrite app icon'
            width={36}
            height={36}
            priority
          />
          <h1 className='text-xl font-semibold text-slate-800'>OnlyWrite</h1>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={scoopUpdate}
            disabled={isUpdatingScoop}
          >
            {isUpdatingScoop ? (
              <>
                <span className='mr-2 h-4 w-4 animate-spin'>◌</span>
                更新中...
              </>
            ) : (
              'Update Scoop App'
            )}
          </Button>
          <Button variant='ghost' size='sm'>
            帮助
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setIsCheckingUpdate(true);
              checkForAppUpdates(true).finally(() => {
                setIsCheckingUpdate(false);
              });
            }}
            disabled={isCheckingUpdate}
          >
            {isCheckingUpdate ? (
              <>
                <span className='mr-2 h-4 w-4 animate-spin'>◌</span>
                检查中...
              </>
            ) : (
              '检查更新'
            )}
          </Button>
        </div>
      </header>

      {/* 主体内容区域 */}
      <div className='flex flex-1 overflow-hidden'>
        {/* 侧边栏 */}
        <aside className='w-64 border-r border-slate-200 bg-white p-4'>
          <div className='mb-6'>
            <h3 className='mb-3 font-medium text-slate-500'>快速访问</h3>
            <div className='space-y-1'>
              <Button
                variant='ghost'
                className='w-full justify-start'
                size='sm'
              >
                <svg
                  className='mr-2 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 4v16m8-8H4'
                  />
                </svg>
                新建文档
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start'
                size='sm'
              >
                <svg
                  className='mr-2 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
                  />
                </svg>
                打开项目
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start'
                size='sm'
              >
                <svg
                  className='mr-2 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z'
                  />
                </svg>
                收藏夹
              </Button>
            </div>
          </div>
          <div>
            <h3 className='mb-3 font-medium text-slate-500'>最近文档</h3>
            <div className='space-y-1'>
              <Button
                variant='ghost'
                className='w-full justify-start text-left'
                size='sm'
              >
                <svg
                  className='mr-2 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                  />
                </svg>
                我的第一篇文章.md
              </Button>
              <Button
                variant='ghost'
                className='w-full justify-start text-left'
                size='sm'
              >
                <svg
                  className='mr-2 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
                  />
                </svg>
                项目规划.md
              </Button>
            </div>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className='flex-1 overflow-auto p-8'>
          <div className='mx-auto max-w-3xl'>
            <div className='mb-8 text-center'>
              <h2 className='mb-2 text-3xl font-bold text-slate-800'>
                欢迎使用 OnlyWrite
              </h2>
              <p className='text-slate-500'>
                简洁而强大的桌面写作应用，让您专注于内容创作
              </p>
            </div>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* 功能卡片 */}
              <div className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                </div>
                <h3 className='mb-2 text-lg font-medium text-slate-800'>
                  新建文档
                </h3>
                <p className='mb-4 text-sm text-slate-500'>
                  开始一个全新的写作项目，记录您的想法和创意
                </p>
                <Button className='w-full'>创建文档</Button>
              </div>

              <div className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
                <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  </svg>
                </div>
                <h3 className='mb-2 text-lg font-medium text-slate-800'>
                  学习教程
                </h3>
                <p className='mb-4 text-sm text-slate-500'>
                  查看使用指南，掌握 OnlyWrite 的全部功能
                </p>
                <Button variant='outline' className='w-full'>
                  查看教程
                </Button>
              </div>
            </div>

            <div className='mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
              <h3 className='mb-4 text-lg font-medium text-slate-800'>
                快速开始
              </h3>
              <div className='space-y-3'>
                <Button variant='secondary' className='w-full justify-start'>
                  <svg
                    className='mr-2 h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                    />
                  </svg>
                  浏览模板库
                </Button>
                <Button variant='secondary' className='w-full justify-start'>
                  <svg
                    className='mr-2 h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2'
                    />
                  </svg>
                  导入现有文档
                </Button>
                <Button variant='link' className='w-full justify-start'>
                  <svg
                    className='mr-2 h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                    />
                  </svg>
                  <a href='./login'>登录您的账户</a>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* 底部状态栏 */}
      <footer className='border-t border-slate-200 bg-white px-6 py-2 text-sm text-slate-500'>
        <div className='flex items-center justify-between'>
          <span>© {new Date().getFullYear()} OnlyWrite</span>
          <span>版本 {appVersion.version}</span>
        </div>
      </footer>
    </div>
  );
}
