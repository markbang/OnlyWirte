// hooks/useTauriAppVersion.js (或 .ts)
// 标记这个 Hook 及其逻辑只在客户端运行
'use client';

import { get } from 'http';
import { Type } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * 自定义 Hook，用于安全地获取 Tauri 应用的版本信息。
 * @returns {{ version: string | null; loading: boolean; error: any }}
 * 包含版本信息、加载状态和错误的对​​象。
 */
export function useTauriAppVersion() {
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const getappVersion = async () => {
      try {
        setLoading(true);
        const { app } = await import('@tauri-apps/api');
        const appVersion = await app.getVersion();
        setVersion(appVersion);
        setLoading(false);
      } catch (err) {
        console.error('获取应用版本失败:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getappVersion();
  }, []);
  return { version, loading, error };
}

/**
 * 自定义 Hook，用于获取 Tauri 应用的操作系统类型。
 * @returns {string | null} 操作系统类型。
 **/

export function useTauriOsType() {
  const [osType, setOsType] = useState<string | null>(null);
  type OsType = 'linux' | 'macos' | 'windows' | 'ios' | 'android' | null;
  useEffect(() => {
    const getOsType = async () => {
      try {
        const { type } = await import('@tauri-apps/plugin-os');
        const osTypeValue = await type();
        setOsType(osTypeValue);
      } catch (err) {
        console.error('获取操作系统类型失败:', err);
      }
    };
    getOsType();
  }, []);
  return osType as OsType;
}
