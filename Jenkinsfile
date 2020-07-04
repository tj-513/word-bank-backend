pipeline {
  agent any

  stages {
    stage('build and deploy') {
      steps {
        script{
          sh './infra/build.sh'
          deleteDir()
        }
      }
    }
  }
}