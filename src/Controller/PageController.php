<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PageController extends AbstractController
{
    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        return $this->render('index.html.twig');
    }

    #[Route('/sophrologie', name: 'app_sophrologie')]
    public function sophrologie(): Response
    {
        return $this->render('sophrologie.html.twig');
    }

    #[Route('/seances', name: 'app_seances')]
    public function seances(): Response
    {
        return $this->render('sophrologie.html.twig');
    }

    #[Route('/qui-suis-je', name: 'app_qui_suis_je')]
    public function quiSuisJe(): Response
    {
        return $this->render('sophrologie.html.twig');
    }

    #[Route('/tarifs', name: 'app_tarifs')]
    public function tarifs(): Response
    {
        return $this->render('sophrologie.html.twig');
    }

    #[Route('/contact', name: 'app_contact')]
    public function contact(): Response
    {
        return $this->render('sophrologie.html.twig');
    }
}
