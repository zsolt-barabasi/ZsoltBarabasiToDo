<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Todo::getAllSorted();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        if (!is_string($data['title']) || strlen($data['title']) === 0) {
            return response()->json(['error' => 'Title is required'], 400);
        }
        return Todo::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'priority' => $data['priority'],
            'status' => 0,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Todo::where('id', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = json_decode($request->getContent(), true);
        if (!is_string($data['title']) || strlen($data['title']) === 0) {
            return response()->json(['error' => 'Title is required'], 400);
        }
        return Todo::where('id', $id)->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'priority' => $data['priority'],
            'status' => $data['status'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $todo = Todo::findOrFail($id);
        return $todo->delete();
    }
}
