package com.servico.backservico.controller;

import com.servico.backservico.entity.Servico;
import com.servico.backservico.service.ServicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@RequestMapping("/api/servico")
public class ServicoController {

    @Autowired
    private ServicoService servicoService;

    @GetMapping("/")
    @CrossOrigin("http://localhost:3000")
    public List<Servico> buscarTodos() {
        return servicoService.buscarTodos();
    }

    @GetMapping("/pagamentoPendente")
    @CrossOrigin("http://localhost:3000")
    public List<Servico> buscarServicosPagamentoPendente() {
        return servicoService.buscarServicosPagamentoPendente();
    }

    @GetMapping("/cancelados")
    @CrossOrigin("http://localhost:3000")
    public List<Servico> buscarServicosCancelados() {
        return servicoService.buscarServicosCancelados();
    }

    @PostMapping("/")
    @CrossOrigin("http://localhost:3000")
    public Servico inserir(@RequestBody Servico servico) {
        return servicoService.inserir(servico);
    }

    @PutMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Servico> alterar( @PathVariable Long id, @RequestBody Servico servico){
        return ResponseEntity.ok(servicoService.alterar(id, servico));
    }


    @DeleteMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> excluir(@PathVariable("id") Long id) {
        servicoService.excluir(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/cancelar/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> cancelar(@PathVariable("id") Long id) {
        servicoService.cancelarServico(id);
        return ResponseEntity.ok().build();
    }
}
