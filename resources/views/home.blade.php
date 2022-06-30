@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <button type="button" class="btn btn-outline-primary float-right" @click="newFact()">Nuevo</button>
                    <br><br>

                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Position</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "info in information">
                            <th scope="row">@{{ info.id }}</th>
                            <td>@{{ info.name }}</td>
                            <td>@{{ info.position }}</td>
                            <td>@{{ info.salary }}</td>
                            <td>
                                <button type="button" class="btn btn-outline-info">Editar</button>
                                <button type="button" class="btn btn-outline-danger" @click="deleteFact(info)">Eliminar</button>
                            </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
