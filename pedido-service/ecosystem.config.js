module.exports = {
	apps : [{
		name: "qconveniente-api-rest",
		script: "dist/server.js",
		exec_mode : "cluster",
		instances: 2,
		autorestart: true,
		watch: ["src"],
		env: { NODE_ENV: "development" },
		env_production: { NODE_ENV: "production" }	   
	}],	 
};
