import { execSync } from 'child_process';
execSync('npx --yes sharp-cli@latest -i public/invitation-design.png -o public/invitation-design-thumb.jpeg resize 1200');
