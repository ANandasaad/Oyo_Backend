echo "Script started"
touch ./server/business.logic/$1.business.logic.ts
touch ./server/controllers/$1.controller.ts
touch ./server/validations/$1.validations.ts
touch ./server/routes/$1.routes.ts
echo "Script completed"
# chmod +x scripts/create.sh
