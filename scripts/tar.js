/* eslint-disable no-console */

const fs = require('fs')
if (!fs.existsSync('dist') || !fs.existsSync('dist/index.html')) {
  throw new Error('请先构建项目')
}

// const del = require('delete')
// del.sync([
//   'build/static/css/*.map',
//   'build/static/js/*.map',
// ])

const compressing = require('compressing')

const targetFile = 'dist.tar'
compressing.tar.compressDir('dist', targetFile, { ignoreBase: true })
  .then(() => console.log('压缩成功'))
  .catch(console.log)

// const NodeSSH = require('node-ssh')
// const ssh = new NodeSSH()
// const uuid = require('uuid/v1')
// const workPath = '/home/dev/app'
// const appPath = config.workDir
// ssh.connect(config.ssh)
//   .then(async () => {
//     const remoteName = `${uuid()}.tar`
//     try {
//       console.log('正在上传文件...')
//       await ssh.putFile(targetFile, `${workPath}/${remoteName}`)
//       console.log('文件已发送至服务器')
//     } catch (error) {
//       throw new Error('传送文件失败')
//     }
//     const backupPath = `${appPath}_backup`
//     await ssh.exec('rm', ['-rf', backupPath], { cwd: workPath })
//     await ssh.execCommand(`mkdir ${backupPath}`, { cwd: workPath })
//     await ssh.exec('tar', ['-xf', remoteName, '-C', backupPath], { cwd: workPath })
//     await ssh.exec('rm', [remoteName], { cwd: workPath })
//     await ssh.execCommand(`rm -rf ${appPath} && mv ${backupPath} ${appPath}`, { cwd: workPath })
//     ssh.dispose()
//   })
//   .catch(e => {
//     ssh.dispose()
//     throw e
//   })
