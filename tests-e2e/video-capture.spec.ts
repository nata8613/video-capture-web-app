import { test, expect } from '@playwright/test';

test.describe('Video Capture Flow', () => {
  test.beforeEach(async ({ page, context }) => {
    // Grant camera permissions
    await context.grantPermissions(['camera']);
    await page.goto('/');
  });

  test('should display the main heading and instructions', async ({ page }) => {
    // Check for main heading
    await expect(page.getByRole('heading', { name: /video capture/i })).toBeVisible();

    // Check for instructions text
    await expect(page.getByText(/click the button to allow camera access/i)).toBeVisible();

    // Check for Start button
    await expect(page.getByRole('button', { name: /start camera/i })).toBeVisible();
  });

  test('should show video placeholder before streaming', async ({ page }) => {
    // Video placeholder with icon should be visible
    const videoContainer = page.locator('[aria-label="Camera feed"]');
    await expect(videoContainer).toBeVisible();

    // Video icon should be visible (decorative, so aria-hidden)
    const videoIcon = page.locator('svg').first();
    await expect(videoIcon).toBeVisible();
  });

  test('should start video stream when Start button is clicked', async ({ page }) => {
    // Click the Start button
    await page.getByRole('button', { name: /start camera/i }).click();

    // Button should become disabled with updated label
    const button = page.getByRole('button', { name: /camera is active/i });
    await expect(button).toBeDisabled();

    // Video element should be playing
    const video = page.locator('video');
    await expect(video).toBeVisible();

    // Check that video has autoplay and muted attributes
    await expect(video).toHaveAttribute('autoplay');
  });

  test('should display timer countdown after starting camera', async ({ page }) => {
    // Start the camera
    await page.getByRole('button', { name: /start camera/i }).click();

    // Timer should appear with role="timer"
    const timer = page.getByRole('timer');
    await expect(timer).toBeVisible();

    // Should show countdown message
    await expect(timer).toContainText(/photo will be taken in:/i);
    await expect(timer).toContainText(/5 seconds/i);

    // Wait and check countdown is decreasing
    await page.waitForTimeout(1100);
    await expect(timer).toContainText(/4 seconds/i);
  });

  test('should capture snapshot after timer completes', async ({ page }) => {
    // Start the camera
    await page.getByRole('button', { name: /start camera/i }).click();

    // Wait for timer to complete (5 seconds + buffer)
    await page.waitForTimeout(6000);

    // Snapshot image should be visible
    const snapshot = page.getByRole('img', { name: /captured snapshot/i });
    await expect(snapshot).toBeVisible();

    // Image should have a valid data URL source
    const src = await snapshot.getAttribute('src');
    expect(src).toMatch(/^data:image\/png;base64,/);

    // Timer should no longer be visible
    await expect(page.getByRole('timer')).not.toBeVisible();

    // Start button should be enabled again
    await expect(page.getByRole('button', { name: /start camera/i })).toBeEnabled();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check section labels
    await expect(page.locator('[aria-labelledby="instructions-heading"]')).toBeVisible();
    await expect(page.locator('[aria-label="Video preview"]')).toBeVisible();
    await expect(page.locator('[aria-label="Snapshot result"]')).toBeVisible();

    // Start camera
    await page.getByRole('button', { name: /start camera/i }).click();

    // Check timer has proper ARIA attributes
    const timer = page.getByRole('timer');
    await expect(timer).toHaveAttribute('aria-live', 'polite');
    await expect(timer).toHaveAttribute('aria-atomic', 'true');

    // Check video has proper label
    const video = page.locator('video[aria-label="Live camera preview"]');
    await expect(video).toBeVisible();
  });

  test('should allow keyboard navigation', async ({ page }) => {
    // Focus on Start button using Tab
    await page.keyboard.press('Tab');

    const startButton = page.getByRole('button', { name: /start camera/i });
    await expect(startButton).toBeFocused();

    // Activate button with Enter key
    await page.keyboard.press('Enter');

    // Button should be disabled after activation
    await expect(page.getByRole('button', { name: /camera is active/i })).toBeDisabled();
  });

  test('should complete full capture flow multiple times', async ({ page }) => {
    // First capture
    await page.getByRole('button', { name: /start camera/i }).click();
    await page.waitForTimeout(6000);

    const snapshot1 = page.getByRole('img', { name: /captured snapshot/i });
    await expect(snapshot1).toBeVisible();

    // Second capture - button should be enabled again
    await page.getByRole('button', { name: /start camera/i }).click();
    await page.waitForTimeout(6000);

    // Snapshot should still be visible (replaced with new one)
    const snapshot2 = page.getByRole('img', { name: /captured snapshot/i });
    await expect(snapshot2).toBeVisible();
  });
});
