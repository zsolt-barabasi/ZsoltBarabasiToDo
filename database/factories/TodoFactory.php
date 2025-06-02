<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(2, true),
            'description' => fake()->words(6, true),
            'priority' => fake()->randomElement(['0', '1', '2']),
            'status' => fake()->boolean(),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
