package com.servico.backservico.service;
import com.servico.backservico.entity.Servico;
import com.servico.backservico.repository.ServicoRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServicoService {

    @Autowired
    private ServicoRepository servicoRepository;

    public List<Servico> buscarTodos() {
        return servicoRepository.findAll();
    }

    public List<Servico> buscarServicosPagamentoPendente() {
        return servicoRepository.buscarServicoPagamentoPendente();
    }

    public List<Servico> buscarServicosCancelados() {
        return servicoRepository.buscarServicosCancelados();
    }

    public Servico inserir(Servico servico) {
        if (servico.getValorPago() == null || servico.getValorPago() == 0 || servico.getDataPagamento() == null) {
            servico.setStatus("pendente");
        } else {
            servico.setStatus("realizado");
        }
        return servicoRepository.saveAndFlush(servico);
    }

    public Servico alterar(Long id, Servico servico) {
        Servico servicoAlter = validateServico(id);
        if (servico.getValorPago() != null && servico.getValorPago() > 0 && servico.getDataPagamento() != null) {
            servico.setStatus("realizado");
        }
        BeanUtils.copyProperties(servico, servicoAlter, "id");
        return servicoRepository.save(servicoAlter);
    }

    public void cancelarServico (Long id) {
        Servico servicoAlter = validateServico(id);

        Servico servico = servicoRepository.findById(id).get();
        servico.setStatus("cancelado");

        BeanUtils.copyProperties(servico, servicoAlter, "id");
        servicoRepository.save(servicoAlter);
    }

    public Servico validateServico(Long id) {
        Optional<Servico> servico = servicoRepository.findById(id);
        if (servico.isEmpty()) {
            throw new EmptyResultDataAccessException(1);
        }
        return servico.get();
    }



    public void excluir(Long id) {
        Servico servico = servicoRepository.findById(id).get();
        servicoRepository.delete(servico);
    }
}
