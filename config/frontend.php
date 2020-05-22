<?php
return [
    'BASE_URL' => env('FRONTEND_BASE_URL', 'app.devilfish.local'),
    'RESET_PASSWORD_URL' => env('FRONTEND_BASE_URL').'authentication/reset-password',
    'PROFILE_URL' => env('FRONTEND_BASE_URL').'profile',
    'EMAIL_VERIFICATION' => env('FRONTEND_BASE_URL').'authentication/email-verification',
];
