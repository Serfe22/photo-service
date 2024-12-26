import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const waitTime = 10; // Set the countdown time (in seconds)

  // Print the first static line (waiting for MySQL message)
  console.log("Waiting for MySQL to be available...");

  // Print the line for the countdown timer
  process.stdout.write("Time remaining: ");
  
  // Countdown timer on the same line
  for (let i = waitTime; i > 0; i--) {
    process.stdout.write(`\rTime remaining: ${i} seconds             `); // Write extra spaces to clear the old countdown
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before the next iteration
  }

  // Clear the line after countdown is complete (overwrite remaining characters)
  process.stdout.write("\rTime remaining:                    "); // Write extra spaces to clear the old countdown

  //  Print the second static line final message once countdown reaches 0
  console.log("\rMySQL is now available!");

  // Start the NestJS application
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());

  // Start the app on port 3000
  await app.listen(3000);
}
bootstrap();
