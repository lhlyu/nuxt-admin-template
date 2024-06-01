#!/bin/bash

check_package_manager() {
  # 检查当前目录是否有package.json文件
  if [ -f "package.json" ]; then
    # 检查是否有pnpm的锁定文件
    if [ -f "pnpm-lock.yaml" ]; then
      echo "pnpm"
    # 检查是否有yarn的锁定文件
    elif [ -f "yarn.lock" ]; then
      echo "yarn"
    # 检查是否有npm的锁定文件
    elif [ -f "package-lock.json" ]; then
      echo "npm"
    else
      echo "none"
    fi
  else
    echo "none"
  fi
}

# 调用函数并获取返回值
package_manager=$(check_package_manager)

# 根据返回值调用不同的函数
case $package_manager in
  "pnpm")
    echo "正在使用pnpm包管理器..."
    license="./node_modules/@nuxt/ui-pro/modules/pro/index.ts"
    ;;
  "yarn")
    echo "正在使用yarn包管理器..."
    license="./node_modules/@nuxt/ui-pro/modules/pro/index.ts"
    ;;
  "npm")
    echo "正在使用npm包管理器..."
    license="./node_modules/@nuxt/ui-pro/modules/pro/index.ts"
    ;;
  "none")
    echo "当前目录不是一个Node项目，脚本结束。"
    exit 0
    ;;
esac


# 修改源码，跳过license校验
update_nuxt_ui_pro() {
  if [ -f "$license" ] && [ -w "$license" ]; then
    awk '{sub(/nuxt.options.test/, "true")}1' "$license" > "$license.tmp" && mv "$license.tmp" "$license"
    echo '修改完成'
    # 修改完后build
    nuxt build
  else
    echo "无法修改文件 $license，可能文件不存在或没有写入权限。"
  fi
}


echo '开始修改源码'
update_nuxt_ui_pro