#!/usr/bin/env groovy

timeout(20) { //fail build after 20 min
	node('master') { //Start the build pipeline on master
		stage ('SCM') {
			/**
			Source Control Management Stage
			**/
			echo 'Source Control Management Stage'
			deleteDir() //clean working directory
			checkout scm //GIT Checkout
			stash includes: '**', name: 'codebase' //Stash fetched files into a 'codebase' package
		}
		stage ('Init') {
			echo 'Setup project environment'
			deleteDir() //Clean working directory
			unstash 'codebase' //Unstash 'codebase' package
			sh 'npm	install'
		}
		stage ('Linting') {
			parallel (
				'lint:ts' : { //CSS Linting
					echo 'npm run lint:ts'
				},
				'lint:css' : { //TS Linting
					echo 'npm run lint:css'
				},
				failFast: true
			)
		}
		stage ('Artifacts') {
			/**
			Artifacts Publishig Stage
			**/
			parallel (
				'Electron App' : { //Publishing the artifact
					publishHTML(target: [
						allowMissing: false,
						keepAll     : true,
						reportDir   : 'public',
						reportFiles : 'index.html',
						reportName  : 'Electron'
					])
				},
				failFast: true
			)
		}
		stage ('Tests') {
			echo 'Tests'
		}
		stage ('Clean Up') {
			deleteDir() //clean working directory
		}
	}
}
