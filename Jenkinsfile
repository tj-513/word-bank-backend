pipeline {
  agent any

  stages {
    stage('build and deploy') {
      steps {
        script{
          sh 'chmod +x ./infra/build.sh'
          sh './infra/build.sh'
          deleteDir()
        }
      }
    }
  }
}